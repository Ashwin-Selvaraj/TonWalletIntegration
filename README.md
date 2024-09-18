# TonWalletIntegration

## React App with Ton Wallet Integration

This repository contains a React application integrated with the TON Connect SDK, demonstrating how to connect, disconnect, and manage wallet interactions using the TON blockchain.

## Features
- **Connect to TON Wallet**: Provides functionality to connect to a TON wallet using the `useTonConnectUI` hook from the `@tonconnect/ui-react` library.
- **Disconnect from TON Wallet**: Allows users to disconnect their wallet with a single button click.
- **Display Wallet Address**: Fetches and displays the connected wallet address in a URL-safe Base64 format.
- **Loading State**: Shows a loading state while checking the wallet connection status.

## Key Components
- **`Home` Component**: Handles wallet connection and disconnection logic, manages the loading state, and displays the wallet address.
- **Hexadecimal to Base64 URL-Safe Conversion**: Converts wallet addresses from hexadecimal to Base64 URL-safe format for display purposes.

## Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ton-wallet-integration.git
   cd ton-wallet-integration

2. **Navigate to the Project Directory:**
   ```bash
   cd Form-to-TonWalletIntegration

3. **Install Dependencies:**
   ```bash
   cd npm install
