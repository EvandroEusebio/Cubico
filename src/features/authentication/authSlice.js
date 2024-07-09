import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import API_URL from "../../../config/api";

const initialState = {
  error: null,
  user: null,
  token: "",
  isAuthenticated: false,
  isloading: false,
};

export const login = createAsyncThunk("login", async (data) => {
  try {
    const response = await axios.post(API_URL + "api/v1/login", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      /*
      console.error(
        "Credenciais incorretas: " + JSON.stringify(error.response.data)
      );*/
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Credenciais incorretas",
        textBody: "Erro: " + error.response.data.message,
      });
    } else {
      /*
      console.error("Erro:", error.response.data);
      */
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Erro de Entidade",
        textBody: "Erro: " + error.response.data.message,
      });
    }
    throw error;
  }
});

export const register = createAsyncThunk("register", async (data) => {
  try {
    const response = await axios.post(API_URL + "api/v1/register", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      /*
      console.error(
        "Erro ao criar o usuário:",
        JSON.stringify(error.response.data)
      );
      */
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Erro ao criar o usuário:",
        textBody: "Erro: " + error.response.data.message,
      });
    } else {
      /*
      console.error("Erro:", error);
      */
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Erro ao criar o usuário:",
        textBody: "Erro: " + error.response.data.message,
      });
    }
    throw error;
  }
});

export const updateUser = createAsyncThunk("updateUser", async (data) => {
  console.log(data.id);
  console.log(data);
  try {
    const response = await axios.put(
      API_URL + `api/v1/user/update/${data.id}`,
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Erro",
      textBody: "Erro: " + error.response.data.message,
    });
  }

  /*
  const response = await fetch(API_URL + "api/v1/user/update/" + id, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
      //"Authorization": `Bearer ${token}`
    },
  });*/
});

/*
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'Ola, Seja bem vindo!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
*/

export const updateImageProfile = createAsyncThunk(
  "updateUser",
  async (data) => {
    console.log(data.id);
    console.log(data);
    await axios
      .post(API_URL + `api/v1/user/add/image_profile/${data.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response.data);

        console.warn("Enviado com sucesso");
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }
);

const storeDeviceToken = async (user_id) => {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  const data = {
    token: token.data,
    user_id: user_id,
  };
  await axios
    .post(API_URL + `api/v1/criar/devicetoken`, data)
    .then(function (response) {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const logout = createAsyncThunk("logout", async (token) => {
  try {
    const response = await axios.post(API_URL + "api/v1/user/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return console.log(response.data.msg);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*----------------------login----------------------------------*/
      .addCase(login.pending, (state, action) => {
        state.isloading = true;
        state.user = null;
        state.isAuthenticated = false;
        state.token = "";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload: { user, token } }) => {
        state.isloading = false;
        console.log("loading: " + state.isloading);
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        //console.warn("Autenticado com sucesso!");
        state.error = null;
        storeDeviceToken(user.id);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Autenticado com sucesso!",
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.isloading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = "";
        state.error = null;
        state.error = JSON.stringify(action.error.message);
        console.warn("Erro: " + state.error);
      })

      /*----------------------UPDATE----------------------------------*/
      .addCase(updateUser.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload: { error, user } }) => {
        state.isloading = false;

        state.user = user;
        //console.warn("sucesso!");
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Usuário atualizado com sucesso!",
        });
        console.log(state.user.id);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isloading = false;
      })

      /*----------------------Register----------------------------------*/
      .addCase(register.pending, (state, action) => {
        state.isloading = true;
        state.user = null;
        state.isAuthenticated = false;
        state.token = "";
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, { payload: { message, user, token } }) => {
          state.isloading = false;
          console.log("loading: " + state.isloading);
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
          //console.warn("Autenticado com sucesso!");
          state.error = null;
          storeDeviceToken(user.id);
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Autenticado com sucesso!",
          });
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.isloading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = "";
        state.error = null;
        state.error = JSON.stringify(action.error.message);
        console.warn("Erro: " + state.error);
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isloading = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.message = null; // Limpa qualquer erro anterior
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Logout com sucesso!",
        });
      });
  },
});

export default authSlice.reducer;

/*

*/
