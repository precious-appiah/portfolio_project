interface HeroProps{
    completed: number;
    total :number
}
const Hero:  React.FC<HeroProps>=({completed, total})=>{
    return (
        <section>
          <div>
            <p>Task Done</p>
            <p>Keep it up</p>
          </div>
          <div>
            {completed}/{total}
          </div>
        </section>
      );

}

export default Hero;
