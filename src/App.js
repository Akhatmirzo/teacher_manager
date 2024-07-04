import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { auth } from "./Firebase/Firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import Home from "./pages/Home";
import Loading from "./components/Loadings/Loading";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        navigate("/");
        toast.success("You are logged in");
      } else {
        navigate("/");
        setUser(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const threshold = 160;

    const detectDevTools = () => {
      const width = window.outerWidth - window.innerWidth;
      const height = window.outerHeight - window.innerHeight;

      if (width > threshold || height > threshold) {
        alert("Dev tools ochildi!");
        // Saytingizni to'xtatish yoki boshqa amal bajarish
        document.body.innerHTML = "Sayt ishlamayapti. Dev toolni yoping va Saytni yangilashingiz kerak!!!!!!!!!!!!";
      }
    };

    const interval = setInterval(detectDevTools, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {user ? (
        <Home />
      ) : (
        <Routes>
          <Route path="/" element={<Login setLoading={setLoading} />} />
          <Route
            path="/register"
            element={<Register setLoading={setLoading} />}
          />
        </Routes>
      )}

      <Loading loading={loading} />
    </>
  );
}

export default App;
