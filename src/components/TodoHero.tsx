interface HeroProps {
  completed: number;
  total: number;
}
const Hero: React.FC<HeroProps> = ({ completed, total }) => {
  return (
    <section className="flex flex-wrap justify-center item-center mt-10 w-full">
      <div className=" flex  justify-between w-1/3 border border-amber-300 rounded p-2">
        <div className="mr-10 p-3">
          <p className="text-lg">Task Done</p>
          <p className="text-sm">Keep it up</p>
        </div>
        <div className="bg-amber-300 flex pt-2  rounded-full justify-center item-center w-10 h-10 mt-5">
          {completed}/{total}
        </div>
      </div>
    </section>
  );
};

export default Hero;
