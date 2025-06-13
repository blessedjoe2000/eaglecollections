import { Skeleton } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-center p-10">
      {[...Array(20)].map((_, i) => (
        <Skeleton animation="wave" key={i} width={200} height={450} />
      ))}
    </div>
  );
};

export default ProductSkeleton;
