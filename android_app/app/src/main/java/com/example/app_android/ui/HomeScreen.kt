package com.example.app_android.ui

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun HomeScreen(
    userName: String = "NombreUsuario",
    fullNames: String = "Nombres y apellidos",
    email: String = "Correo electronico",
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 40.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(60.dp))

        // CAMBIO: Usamos las mayúsculas que devuelve tu modelo User.php (PascalCase)
        Text(
            text = "Hola $userName",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF4A6572)
        )

        Spacer(modifier = Modifier.height(40.dp))

        // User Info Row 1 (Corresponde a Nombres y Apellidos en User.php)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = "Cuenta:", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color(0xFF4A6572))
            Text(text = fullNames, fontSize = 14.sp, color = Color(0xFF4A6572))
        }

        Spacer(modifier = Modifier.height(16.dp))

        // User Info Row 2 (Corresponde a Correo_Electronico en User.php)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = "Correo:", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color(0xFF4A6572))
            Text(text = email, fontSize = 14.sp, color = Color(0xFF4A6572))
        }

        Spacer(modifier = Modifier.height(80.dp))

        // Balance
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(text = "Saldo disponible:", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color(0xFF4A6572))
            Text(text = "0.00 BS", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = Color.Black)
        }

        Spacer(modifier = Modifier.height(40.dp))

        // Transactions Box
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .border(1.dp, Color.Black)
                .padding(16.dp)
        ) {
            Column {
                Text(
                    text = "Lista de transacciones:",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF4A6572)
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                HorizontalDivider(thickness = 1.dp, color = Color.Gray)
                
                TransactionItem()
                
                HorizontalDivider(thickness = 1.dp, color = Color.Gray)
                
                TransactionItem()
            }
        }

        Spacer(modifier = Modifier.weight(1f))

        // Pagar Button
        Button(
            onClick = { /* Handle Payment */ },
            modifier = Modifier
                .width(150.dp)
                .height(50.dp),
            shape = RoundedCornerShape(4.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF424242),
                contentColor = Color.White
            )
        ) {
            Text("Pagar", fontSize = 14.sp)
        }

        Spacer(modifier = Modifier.height(40.dp))
    }
}

@Composable
fun TransactionItem() {
    Column(modifier = Modifier.padding(vertical = 8.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = "Pago:", fontSize = 14.sp, fontWeight = FontWeight.Bold)
            Text(text = "00.00 BS", fontSize = 14.sp, fontWeight = FontWeight.Bold)
        }
        Text(
            text = "DD - MM - YYYY - HH:MM AM/FM",
            fontSize = 12.sp,
            color = Color.Gray
        )
    }
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
fun HomeScreenPreview() {
    HomeScreen()
}
