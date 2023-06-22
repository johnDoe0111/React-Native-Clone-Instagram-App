import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { authorization } from "../redux/user/authorizationAction";
import { useEffect } from "react";

const LoginSchema = Yup.object().shape({
  username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(""),
  password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(""),
});

export default function Autorization({ navigation }: any) {
  const dispatch = useAppDispatch();
  const { isAdmin, isLoading } = useAppSelector((state) => state.authorization);

  const handleFormSubmit = (
    values: { username: string; password: string },
    { resetForm }: any
  ) => {
    console.log(values);
    dispatch(authorization(values));
    resetForm();
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isAdmin) {
      navigation.navigate("Homepage");
    } else {
      navigation.navigate("Authorization");
    }
  }, [isAdmin]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#6A6A6A" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <View style={styles.formBlock}>
              <Text style={styles.text}>Instagram</Text>
              <TextInput
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                placeholder="Имя пользователя"
                style={[styles.button, { marginTop: 20 }]}
              />
              {errors.username && touched.username ? (
                <Text style={{ color: "red" }}>{errors.username}</Text>
              ) : null}
              <TextInput
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="Пароль"
                style={[styles.button, { marginTop: 10 }]}
                secureTextEntry={true}
              />
              {errors.password && touched.password ? (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit as any}
              >
                <Text style={styles.buttonText}>Войти</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "mt-light",
  },
  button: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 10,
    borderColor: "#6A6A6A",
    width: 200,
    textAlign: "center",
  },
  formBlock: {
    paddingTop: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#79A7FF",
    width: 150,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
