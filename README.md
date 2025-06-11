#"dependencies": {
  "@react-native-async-storage/async-storage": "^1.x.x",
  "react-native-paper": "^5.x.x",
  "react-native-maps": "^1.x.x",
  "react-native-reanimated": "^2.x.x",
  "@expo/vector-icons": "^13.x.x",
  "react-native": "0.71.x",
  "react": "18.x.x"

  ##Documentação do Projeto - Oficina Mecânica
Tecnologias e APIs utilizadas
1. React Native
Framework principal para desenvolvimento mobile multiplataforma (iOS e Android) utilizando JavaScript.

2. React Native Paper
Biblioteca de componentes UI baseada no Material Design, usada para criar elementos visuais consistentes como:

Barra de aplicativos (Appbar)

Botões, diálogos, inputs

Cartões (Cards)

FABs (Floating Action Buttons)

3. AsyncStorage (@react-native-async-storage/async-storage)
API para armazenamento local de dados no dispositivo. Utilizada para persistir informações como:

Lista de clientes

Lista de veículos

Lista de serviços

Permite salvar, carregar e resetar dados para manter o estado do app mesmo após fechamento.

4. React Native Maps (react-native-maps)
Componente para integração de mapas nativos do dispositivo. Funcionalidades implementadas:

Exibição da localização fixa da oficina

Marcadores com título e descrição

5. React Native Reanimated (react-native-reanimated)
Biblioteca para animações fluidas e performáticas. Utilizada para:

Animação de entrada dos cards do dashboard (fade-in e escala)

6. Expo Vector Icons (@expo/vector-icons)
Coleção de ícones vetoriais usados para enriquecer a interface com símbolos representativos, como:

Ícones de grupo, carro, ferramentas, calendário, dinheiro, etc.

Funcionalidades principais baseadas nessas APIs
Persistência local de dados para manter informações salvas no dispositivo.

Interface amigável e responsiva utilizando Material Design com React Native Paper.

Visualização de localização no mapa para mostrar a oficina.

Animações suaves para melhorar experiência do usuário.

Uso de ícones vetoriais para clareza visual e estética.