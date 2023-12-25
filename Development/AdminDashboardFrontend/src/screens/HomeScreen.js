import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../components/Home/Main"
const HomeScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <Main />
            </main>
        </>
    )
}

export default HomeScreen;

// import React from "react";
// import Sidebar from "../components/users/Sidebar";
// import Header from "../components/users/Header";

// const HomeScreen = () => {
//   return (
//     <div className="home-screen-container">
//       <Sidebar />
//       <main className="main-wrap">
//         {/* <Header /> */}
//         <div>
//           <p>Welcome to the HomeScreen! Add your content here.</p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomeScreen;
