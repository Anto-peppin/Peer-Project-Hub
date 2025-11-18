
import Typewriter from 'typewriter-effect';

export default function Hero() {
  return (
    <h1 className="text-white text-3xl">
      <Typewriter
        options={{
          strings: ['Developer', 'Designer', 'My friend'],
          autoStart: true,
          loop: true,
        }}
      />
    </h1>
  );
}
