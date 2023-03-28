import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { auth, app, db, getFirestore, doc, setDoc, getDoc } from "../firebase/config.js";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#76D7C4",
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
    height: 40
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.30
  },
  buttonText: {
    color: '#76D7C4',
    fontWeight: '700',
    fontSize: 16,
  },
  logoImage: {
    position: 'relative',
    paddingBottom: 30,
    height: 100,
    resizeMode:'contain',
  }
})

let userLists = [
  {
    characters: [],
    key: ["Dogs"],
  },
  {
    characters: [],
    key: ["Cats"],
  },
];

/*const getCloudData = async () => {
  try {
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap =  await getDoc(docRef);
    if (docSnap.exists()) {
      return  await docSnap.data().data;
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.log(e);
  }
}

const storeCloudData = async (value) => {
  try {
    const docRef = await setDoc(doc(db, "users", auth.currentUser.email), {
      data: value
    });
  } catch (e) {
    console.log(e);
  }
};*/

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("ChatList")
        // иначе данные из фаербейса не будут загружаться
        //getCloudData().then((value) => (
        //  navigation.navigate("Main", {userLists: value})
        //  ));
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        //storeCloudData(userLists)
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.button]}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login