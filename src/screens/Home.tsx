import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { FAB } from "@rneui/themed";
import { ToastAndroid } from "react-native";

import { AppwriteContext } from "../appwrite/AppwriteContext";

type UserObj = {
  name: String;
  email: String;
};

const Home = () => {
  const [userData, setUserData] = useState<UserObj>();
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);

  const handleLogout = () => {
    appwrite.logout().then(() => {
      setIsLoggedIn(false);
      ToastAndroid.show("logout succesfull", ToastAndroid.LONG);
    });
  };

  useEffect(() => {
    appwrite.getCurrentUser().then((response) => {
      if (response) {
        const user: UserObj = {
          name: response.name,
          email: response.email,
        };
        setUserData(user);
      }
    });
  }, [appwrite]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {userData.name}</Text>
            <Text style={styles.userDetails}>Email: {userData.email}</Text>
          </View>
        )}
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{ name: "logout", color: "#FFFFFF" }}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D32",
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: "center",
  },
  message: {
    fontSize: 26,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});

export default Home;
