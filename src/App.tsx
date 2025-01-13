

const App = () => {

  return (
    <div className="w-screen h-screen bg-slate-600 text-white">
      <div className="border-b w-full pl-4 py-2">toolbar</div>
      <div className="flex">
        <div className="w-[300px]">sidebar</div>
        <div className="flex-1">content</div>
        <div>Howdy</div>
      </div>
    </div>
  );
}

export default App
