import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Login() {
  const { login } = useAuth() || {};
  const router = useRouter();
  const [email, setEmail] = React.useState(""); // armazenar email
  const [name, setName] = React.useState(""); // armazenar nome

  async function handleLogin() {
    if (!email || !name) {
      alert("Por favor, preencha o email e nome para continuar.");
      return; // campo vazio = sem retorno
    }
    await login(email, name); // salva
    router.replace("/(tabs)"); // Substitui a rota para não voltar ao login
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bem-vindo ao App Profissional</Text>
      <Text>Entre com suas credenciais</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail} // atualiza o estado do email conforme o usuário digita
        style={{
          width: "80%",
          padding: 10,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          backgroundColor: "#a5a5a5",
          maxWidth: 300,
        }}
      />
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName} // atualiza o estado do nome conforme o usuário digita
        style={{
          width: "80%",
          padding: 10,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          backgroundColor: "#a5a5a5",
          maxWidth: 300,
        }}
      />
      <Button title="Entrar no Sistema" onPress={handleLogin} />
    </View>
  );
}
