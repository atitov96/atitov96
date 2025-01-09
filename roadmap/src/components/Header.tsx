function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white z-50 h-14 flex items-center shadow-md">
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Roadmap</h1>
          <span className="text-sm opacity-90 ml-4">
            Путь к становлению разработчиком
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
