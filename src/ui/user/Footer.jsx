import Logo from "../../assets/Logo.png";

function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto p-6 xl:px-0">
        <img src={Logo} alt="Logo" className="w-24" />
      </div>
    </footer>
  );
}

export default Footer;
