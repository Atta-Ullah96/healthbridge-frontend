
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./components/routes/route"
import ScrollToTop from "./components/scrolltopTop";
const App = () => {


  return (<>
    {/* <ScrollToTop /> */}
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={3000} // 3 seconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </>
  )
}

export default App