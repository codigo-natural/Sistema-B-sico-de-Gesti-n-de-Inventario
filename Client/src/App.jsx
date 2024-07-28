// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import { Products } from "./pages/Products"
import { Inventory } from "./pages/Inventory"
import { Sales } from "./pages/Sales"
import { Dashboard } from "./pages/Dashboard"
import { Home } from "./pages/Home"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { NotFound } from "./pages/NotFound"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { WarehousePage } from './pages/WareHouses'

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />}
            />
            <Route path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route path="/inventory"
              element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              }
            />
            <Route path="/sales"
              element={
                <ProtectedRoute>
                  <Sales />
                </ProtectedRoute>
              }
            />
            <Route path="/warehouses"
              element={
                <ProtectedRoute>
                  <WarehousePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
