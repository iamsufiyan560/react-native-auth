import { View, Text } from "react-native";
import React from "react";
import { Router } from "../routes/Router";
import { AppwriteProvider } from "../appwrite/AppwriteContext";
import { NavigationContainer } from "@react-navigation/native";

const index = () => {
  return (
    <AppwriteProvider>
      <NavigationContainer independent>
        <Router />
      </NavigationContainer>
    </AppwriteProvider>
  );
};

export default index;
