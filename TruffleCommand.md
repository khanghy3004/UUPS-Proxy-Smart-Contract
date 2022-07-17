# LTD Tokenomic
https://docs.google.com/spreadsheets/d/1lIQIgfXoUXhMDhhXXUyO8aEcn0b1axnJ/edit#gid=600495971

# Setup Truffle

# Truffle Complite command
npx truffle compile

# Deploy contract BSC Testnet
truffle migrate --network testnet
truffle migrate --network testnet --reset

# Deploy contract without compile
truffle deploy --network testnet --reset --compile-none

# Verify contract BSC Testnet
truffle run verify AirDropV2@0x8b515Cc0f2A82044ddD5bd9C5f0304bf1fa07487 --network mainnet


# MAINNET ZONE
truffle migrate --network mainnet