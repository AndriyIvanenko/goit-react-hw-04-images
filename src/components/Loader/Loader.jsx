import { ThreeDots } from 'react-loader-spinner';
import { Div } from './Loader.styled';

export const Loader = () => {
  return (
    <Div>
      <ThreeDots
        height="40"
        width="80"
        radius="9"
        color="#e21919"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Div>
  );
};
