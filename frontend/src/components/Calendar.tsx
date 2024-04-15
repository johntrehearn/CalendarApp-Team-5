'use client';

const Calendar: React.FC = () => {
  // Backgrounds to test:
  // https://images.pexels.com/photos/66284/winter-nature-season-trees-66284.jpeg
  // https://images.pexels.com/photos/1028723/pexels-photo-1028723.jpeg
  // https://images.pexels.com/photos/18512842/pexels-photo-18512842/free-photo-of-autumn-forest-at-night.jpeg

  return (
    <div>
      <div className="p-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.pexels.com/photos/18512842/pexels-photo-18512842/free-photo-of-autumn-forest-at-night.jpeg)' }}>
        <p className="w-max text-center text-3xl m-5 bg-[white] py-3 px-10 rounded-lg mx-auto mb-10">Advent Calendar</p>
        <div className="flex gap-5 flex-wrap justify-center"></div>
      </div>
    </div>
  );
};

export default Calendar;
