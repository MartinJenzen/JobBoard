type CardProps = {
  children: React.ReactNode;
  backgroundColor?: string;
};

const Card = ({ 
  children,
  backgroundColor = 'bg-gray-100'
}: CardProps): React.JSX.Element => {

  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>{children}</div>
  );
}
export default Card;