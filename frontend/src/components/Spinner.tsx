import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading }: { loading: boolean }): React.JSX.Element => {
    
  const spinnerStyle = {
    display: 'block',
    margin: '100px auto'
  };
  
  return (
    <ClipLoader 
      color='#4338CA'
      loading={loading}
      cssOverride={spinnerStyle}
      size={150}
    />
  );
}
export default Spinner;