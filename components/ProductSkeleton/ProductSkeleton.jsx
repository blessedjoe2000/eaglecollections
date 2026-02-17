import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";

const ProductSkeleton = () => {
  return (
    <Stack spacing={1}>
      <div className="flex flex-wrap gap-5 justify-center p-10">
        {[...Array(20)].map((_, i) => (
          <Skeleton animation="wave" key={i} width={200} height={450} />
        ))}
      </div>
    </Stack>
  );
};

export default ProductSkeleton;
