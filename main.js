function optimizarMochila() {
        // Obtener los valores ingresados por el usuario
        let minCalorias = parseInt(document.getElementById("calMin").value);
        let maxPeso = parseInt(document.getElementById("pesoMax").value);
        
        // Lista de elementos disponibles con su peso y calorías
        let elementos = [
            { nombre: "E1", peso: 3, calorias: 3 },
            { nombre: "E2", peso: 3, calorias: 5 },
            { nombre: "E3", peso: 5, calorias: 2 },
            { nombre: "E4", peso: 1, calorias: 8 },
            { nombre: "E5", peso: 2, calorias: 3 }
        ];
        
        let n = elementos.length;
        // Matriz para la programación dinámica
        let dp = Array(n + 1).fill(null).map(() => Array(maxPeso + 1).fill(0));
        
        // Algoritmo de la mochila 0/1 para optimizar la selección de elementos
        for (let i = 1; i <= n; i++) {
            for (let w = 0; w <= maxPeso; w++) {
                if (elementos[i - 1].peso <= w) {
                    // Tomamos el máximo entre no incluir el elemento o incluirlo sumando sus calorías
                    dp[i][w] = Math.max(
                        dp[i - 1][w],
                        dp[i - 1][w - elementos[i - 1].peso] + elementos[i - 1].calorias
                    );
                } else {
                    dp[i][w] = dp[i - 1][w]; // Si el peso excede, mantenemos el valor anterior
                }
            }
        }
        
        // Encontrar los elementos que forman la mejor combinación
        let w = maxPeso, caloriasTotal = dp[n][maxPeso], seleccionados = [];
        for (let i = n; i > 0 && caloriasTotal > 0; i--) {
            if (caloriasTotal !== dp[i - 1][w]) {
                seleccionados.push(elementos[i - 1].nombre); // Agregamos el elemento seleccionado
                caloriasTotal -= elementos[i - 1].calorias; // Restamos sus calorías
                w -= elementos[i - 1].peso; // Restamos su peso
            }
        }
        
        seleccionados.reverse(); // Ordenamos los elementos seleccionados
        
        // Mostrar los elementos seleccionados en la página
        document.getElementById("resultado").innerText = `Elementos: ${seleccionados.join(", ")}`;
    }
