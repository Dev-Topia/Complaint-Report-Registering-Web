function Header() {
  return (
    <header className="flex justify-between items-center p-6 sticky top-0 left-0 z-40 h-[10vh] bg-white border-b-2">
      <h1 className="font-bold text-2xl">Hello User!</h1>
      <div className="flex items-center gap-2">
        <div className="bg-[#d9d9d9] w-[50px] h-[50px] rounded-full"></div>
      </div>
    </header>
  );
}

export default Header;
