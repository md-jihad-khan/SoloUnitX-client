import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
const Nav = () => {
  const user = true;

  return (
    <Navbar className="fixed w-full h-20 backdrop-blur-sm bg-white/30 shadow-md pt-2 ">
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt=" Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Solo Unit X
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  className=" border-2 rounded-full w-16 h-16 "
                  size="h-12 w-12"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
            <div className="pt-5">
              <Button color="purple" pill>
                Log In
              </Button>
            </div>
          </>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
