import AppRouter from "./routes/AppRouter";
import AuthInitializer from "./routes/AuthInitializer";

function App() {
    return (
        <AuthInitializer>
            <AppRouter />
        </AuthInitializer>
    );
}

export default App;
