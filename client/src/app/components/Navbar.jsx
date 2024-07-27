"use client";

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { usePathname, useRouter } from "next/navigation";
// import { UserContext } from "../context/User";
// import Image from "next/image";

// const pages = [
//   { id: 1, name: "Generate Quiz", link: "/generate-quiz" },
//   { id: 2, name: "Previous Questions", link: "/previous-questions" },
//   { id: 3, name: "Account Setting", link: "/account-setting" },
//   { id: 4, name: "About Us", link: "/about-us" },
// ];

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const pathName = usePathname();
//   const router = useRouter();
//   const [state, setState] = React.useContext(UserContext);
//   const logout = async () => {
//     await router.push("/login");
//     await window.localStorage.removeItem("auth");
//     await setState({ token: null, user: null });
//   };
//   return pathName.split("/")[1] !== "admin" &&
//     !pathName.split("/").includes("test") ? (
//     state?.token ? (
//       <AppBar position="static" sx={{ backgroundColor: "#020c2b" }}>
//         <Container maxWidth="xl">
//           <Toolbar disableGutters>
//             <Typography
//               variant="h6"
//               noWrap
//               component="a"
//               sx={{
//                 mr: 2,
//                 display: { xs: "none", md: "flex" },
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 letterSpacing: ".3rem",
//                 color: "inherit",
//                 textDecoration: "none",
//               }}
//             >
//               <Link href="/">
//                 <Image
//                   src="/assets/Logo.png"
//                   width={160}
//                   height={60}
//                   alt="logo"
//                 />
//               </Link>
//             </Typography>

//             <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//               <IconButton
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleOpenNavMenu}
//                 color="inherit"
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorElNav}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "left",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//                 open={Boolean(anchorElNav)}
//                 onClose={handleCloseNavMenu}
//                 sx={{
//                   display: { xs: "block", md: "none" },
//                 }}
//               >
//                 {pages.map((page, i) => (
//                   <MenuItem key={i} onClick={handleCloseNavMenu}>
//                     <Typography textAlign="center">
//                       <Link href={page.link}>{page.name}</Link>
//                     </Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//             <Typography
//               variant="h5"
//               noWrap
//               component="a"
//               sx={{
//                 mr: 2,
//                 display: { xs: "flex", md: "none" },
//                 flexGrow: 1,
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 letterSpacing: ".3rem",
//                 color: "inherit",
//                 textDecoration: "none",
//               }}
//             >
//               <Link href="/">
//                 <Image
//                   src="/assets/Logo.png"
//                   width={160}
//                   height={60}
//                   alt="logo"
//                 />
//               </Link>
//             </Typography>
//             <Box
//               sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
//               className="justify-evenly"
//             >
//               {pages.map((page, i) => (
//                 <Link
//                   key={i}
//                   href={page.link}
//                   onClick={handleCloseNavMenu}
//                   sx={{ my: 2, color: "white", display: "block" }}
//                 >
//                   {page.name}
//                 </Link>
//               ))}
//             </Box>
//             {state?.token ? (
//               <Button className="bg-gray-900" onClick={logout}>
//                 Log out
//               </Button>
//             ) : (
//               ""
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>
//     ) : (
//       ""
//     )
//   ) : (
//     ""
//   );
// }
// export default ResponsiveAppBar;
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function NavBar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args} container="lg" fixed="top:0">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
