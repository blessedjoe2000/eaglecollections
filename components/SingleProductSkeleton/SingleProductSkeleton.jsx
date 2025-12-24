import { Skeleton } from "@mui/material";

const SingleProductSkeleton = () => {
  return (
    <div className="flex gap-5 justify-center items-center">
      <div>
        <Skeleton animation="wave" width={500} height={800} />
      </div>
      <div className="">
        <Skeleton variant="text" animation="wave" width={200} height={80} />
        <Skeleton variant="text" animation="wave" width={500} height={150} />
        <Skeleton variant="text" animation="wave" width={500} height={60} />
        <Skeleton variant="text" animation="wave" width={500} height={60} />
        <Skeleton variant="text" animation="wave" width={100} height={80} />
        <Skeleton variant="text" animation="wave" width={250} height={60} />
        <div className="flex justify-end">
          <Skeleton animation="wave" width={200} height={80} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
