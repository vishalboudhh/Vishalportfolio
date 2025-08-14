import React from 'react';

const About = () => {
  return (
    <div className='bg-black text-white px-6 md:px-20  overflow-hidden'>
      <div className='max-w-5xl mx-auto bg-black/40 backdrop-blur-md shadow-lg rounded-xl p-8 md:p-12'>
        <h2 className='text-3xl md:text-5xl font-bold mb-6 text-center'>About Me</h2>

        <p className='text-md md:text-xl leading-relaxed text-justify'>
          I'm a <span className='font-semibold text-blue-400'>B.Tech Computer Science</span> graduate with a strong foundation in
          <span className='text-yellow-400 font-medium'> JavaScript</span> and <span className='text-yellow-400 font-medium'>C/C++</span>.
          I'm passionate about building full-stack applications and solving real-world problems using technology.
        </p>

        <p className='text-md md:text-xl leading-relaxed text-justify mt-4'>
          I've worked extensively with the <span className='font-semibold text-green-400'>MERN Stack</span> — building, deploying, and managing full-stack applications independently.
          My hands-on projects reflect my understanding of frontend design, backend logic, database integration, and RESTful APIs.
        </p>

        <p className='text-md md:text-xl leading-relaxed text-justify mt-4'>
          In addition, I'm an active problem solver with over
          <span className='font-semibold text-orange-400'> 300+ questions solved</span> on
          <span className='text-orange-300 font-medium'> LeetCode</span> and
          <span className='text-green-300 font-medium'> GeeksforGeeks</span>, demonstrating my grasp of data structures and algorithms.
        </p>

        <p className='text-md md:text-xl leading-relaxed text-justify mt-4'>
          I believe in continuous learning and enjoy turning ideas into scalable software solutions. I'm currently looking for opportunities to contribute, grow, and collaborate in innovative tech environments.
        </p>
      </div>
    </div>
  );
};

export default About;
