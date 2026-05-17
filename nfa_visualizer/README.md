# Automata Visualizer

An interactive web tool designed to create, visualize, and test finite automata. It streamlines the process of building Non-Deterministic Finite Automata (NFA) and executing the subset construction algorithm to convert them to Deterministic Finite Automata (DFA).

## Features

- **Interactive Canvas**: Build NFAs and DFAs interactively by creating states and drawing transitions.
- **NFA to DFA Conversion**: Execute the subset construction algorithm to convert your NFA to an equivalent DFA, complete with a side-by-side visualization.
- **Real-Time String Testing**: Trace and evaluate input strings step-by-step to see if they are accepted by the automaton.
- **Formal Definition Display**: Dynamically view the formal mathematical description of the automaton, including the full delta ($ \delta $) transition table.

## Getting Started

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) installed to run the application locally.

### Running the Application

1. Clone this repository:
   ```shell
   git clone https://github.com/Syriuu/automata_visualizer.git
   ```

2. Install the dependencies:
   ```shell
   cd automata_visualizer
   npm install
   ```

3. Start the local development server:
   ```shell
   npm start
   ```

Navigate to `http://localhost:8000` in your browser to view the application. The application will automatically reload if you make any local code changes.

## Acknowledgements

This project was built upon the visual foundation of [nfa-to-dfa](https://github.com/joeylemon/nfa-to-dfa), originally developed by Joey Lemon, Camille Williford, Alex Klibisz, and Connor Minton at the University of Tennessee.
