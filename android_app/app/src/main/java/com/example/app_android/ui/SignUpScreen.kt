package com.example.app_android.ui

import android.app.DatePickerDialog
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.app_android.data.RegisterRequest
import java.util.*

@Composable
fun SignUpScreen(
    onSignUpRequest: (RegisterRequest) -> Unit,
    onNavigateToLogin: () -> Unit,
    modifier: Modifier = Modifier
) {
    var nombres by remember { mutableStateOf("") }
    var apellidos by remember { mutableStateOf("") }
    var correoElectronico by remember { mutableStateOf("") }
    var fechaNacimiento by remember { mutableStateOf("2000-01-01") }
    var carnetIdentidad by remember { mutableStateOf("") }
    var contrasena by remember { mutableStateOf("") }
    var confirmContrasena by remember { mutableStateOf("") }
    var rolId by remember { mutableStateOf(1) } // Verifica que el ID 1 o 2 exista en tu tabla Rol

    val scrollState = rememberScrollState()
    val context = LocalContext.current

    val calendar = Calendar.getInstance()
    val datePickerDialog = DatePickerDialog(
        context,
        { _, y, m, d ->
            fechaNacimiento = String.format(Locale.US, "%04d-%02d-%02d", y, m + 1, d)
        },
        calendar.get(Calendar.YEAR),
        calendar.get(Calendar.MONTH),
        calendar.get(Calendar.DAY_OF_MONTH)
    )

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 40.dp)
            .verticalScroll(scrollState),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(40.dp))
        Text(text = "Sign Up", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = Color(0xFF4A6572))
        Spacer(modifier = Modifier.height(24.dp))

        SignUpField(label = "Nombres", value = nombres, onValueChange = { nombres = it })
        SignUpField(label = "Apellidos", value = apellidos, onValueChange = { apellidos = it })
        SignUpField(label = "Correo Electronico", value = correoElectronico, onValueChange = { correoElectronico = it })
        
        // Fecha de nacimiento Clickable
        Column(modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
            Text(text = "Fecha de nacimiento", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color(0xFF4A6572))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp)
                    .border(1.dp, Color.LightGray, RoundedCornerShape(4.dp))
                    .clickable { datePickerDialog.show() }
                    .padding(horizontal = 12.dp),
                contentAlignment = Alignment.CenterStart
            ) {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                    Text(text = fechaNacimiento, fontSize = 14.sp)
                    Icon(imageVector = Icons.Default.DateRange, contentDescription = null, tint = Color.Gray)
                }
            }
        }

        SignUpField(label = "Carnet de identidad", value = carnetIdentidad, onValueChange = { carnetIdentidad = it })
        SignUpField(label = "Contraseña", value = contrasena, onValueChange = { contrasena = it }, isPassword = true)
        SignUpField(label = "Repita contraseña", value = confirmContrasena, onValueChange = { confirmContrasena = it }, isPassword = true)

        Spacer(modifier = Modifier.height(40.dp))

        Button(
            onClick = { 
                if (contrasena == confirmContrasena && nombres.isNotBlank() && apellidos.isNotBlank() && 
                    carnetIdentidad.isNotBlank() && correoElectronico.isNotBlank()) {
                    onSignUpRequest(
                        RegisterRequest(
                            nombres = nombres,
                            apellidos = apellidos,
                            carnetIdentidad = carnetIdentidad,
                            correoElectronico = correoElectronico,
                            fechaNacimiento = fechaNacimiento,
                            contrasena = if (contrasena.isEmpty()) null else contrasena,
                            rolId = rolId
                        )
                    )
                }
            },
            modifier = Modifier.width(150.dp).height(50.dp),
            shape = RoundedCornerShape(4.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF424242))
        ) {
            Text("Sign up")
        }

        Spacer(modifier = Modifier.height(12.dp))
        Button(
            onClick = onNavigateToLogin,
            modifier = Modifier.width(150.dp).height(50.dp),
            shape = RoundedCornerShape(4.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFE0E0E0), contentColor = Color.Black)
        ) {
            Text("Sign In")
        }
        Spacer(modifier = Modifier.height(40.dp))
    }
}

@Composable
fun SignUpField(label: String, value: String, onValueChange: (String) -> Unit, isPassword: Boolean = false) {
    Column(modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
        Text(text = label, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color(0xFF4A6572))
        TextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier.fillMaxWidth().height(50.dp),
            visualTransformation = if (isPassword) PasswordVisualTransformation() else androidx.compose.ui.text.input.VisualTransformation.None,
            colors = TextFieldDefaults.colors(focusedContainerColor = Color(0xFFE8E4ED), unfocusedContainerColor = Color(0xFFE8E4ED)),
            singleLine = true
        )
    }
}
