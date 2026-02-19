export const Badge = (props) => {
    const { status = 'active', children } = props || {};
  const statusColors = {
    active: 'bg-success-bg text-dark',
    pending: 'bg-accent text-dark',
    error: 'bg-error text-white',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
      {children || status}
    </span>
  );
}