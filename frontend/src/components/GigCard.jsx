import { StarIcon } from "@chakra-ui/icons";

const GigCard = () => {
  return (
    <div className="max-w-[18rem]   h-80">
      <img src="python-course.webp" alt="" className="w-full" />
      <div className="p-1">
        <p className="font-medium leading-6">
          Learn the fundamentals of Python programming language...
        </p>
        <StarIcon color={"yellow.500"}></StarIcon>
        <small className="font-semibold"> 4.9</small>
        <div className="flex items-center justify-between">
          <img
            src="saller-avatar.avif"
            alt=""
            className="w-12 h-12 object-cover rounded-full"
          />
          <div>
            <p>Starting at</p>
            <h3 className="text-xl font-semibold">$40.00</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
