package com.example.app_android

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.lifecycleScope
import com.example.app_android.data.LoginRequest
import com.example.app_android.data.RetrofitClient
import com.example.app_android.data.UserResponse
import com.example.app_android.ui.HomeScreen
import com.example.app_android.ui.LoginScreen
import com.example.app_android.ui.SignUpScreen
import com.example.app_android.ui.theme.App_AndroidTheme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            App_AndroidTheme {
                var currentScreen by remember { mutableStateOf("login") }
                var loggedInUser by remember { mutableStateOf<UserResponse?>(null) }

                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    when (currentScreen) {
                        "login" -> LoginScreen(
                            onLoginSuccess = { email, password ->
                                lifecycleScope.launch {
                                    try {
                                        val response = RetrofitClient.instance.login(LoginRequest(email, password))
                                        if (response.isSuccessful && response.body() != null) {
                                            loggedInUser = response.body()?.user
                                            currentScreen = "home"
                                        } else {
                                            Toast.makeText(this@MainActivity, "Error: Credenciales incorrectas", Toast.LENGTH_SHORT).show()
                                        }
                                    } catch (e: Exception) {
                                        Toast.makeText(this@MainActivity, "Error de conexión: ${e.message}", Toast.LENGTH_SHORT).show()
                                    }
                                }
                            },
                            onNavigateToSignUp = { currentScreen = "signup" },
                            modifier = Modifier.padding(innerPadding)
                        )
                        "signup" -> SignUpScreen(
                            onSignUpRequest = { registerData ->
                                lifecycleScope.launch {
                                    try {
                                        val response = RetrofitClient.instance.register(registerData)
                                        if (response.isSuccessful) {
                                            Toast.makeText(this@MainActivity, "Registro exitoso", Toast.LENGTH_SHORT).show()
                                            currentScreen = "login"
                                        } else {
                                            Toast.makeText(this@MainActivity, "Error al registrar: ${response.code()}", Toast.LENGTH_SHORT).show()
                                        }
                                    } catch (e: Exception) {
                                        Toast.makeText(this@MainActivity, "Error de red: ${e.message}", Toast.LENGTH_SHORT).show()
                                    }
                                }
                            },
                            onNavigateToLogin = { currentScreen = "login" },
                            modifier = Modifier.padding(innerPadding)
                        )
                        "home" -> {
                            loggedInUser?.let { user ->
                                HomeScreen(
                                    userName = user.nombres,
                                    fullNames = "${user.nombres} ${user.apellidos}",
                                    email = user.email,
                                    modifier = Modifier.padding(innerPadding)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
