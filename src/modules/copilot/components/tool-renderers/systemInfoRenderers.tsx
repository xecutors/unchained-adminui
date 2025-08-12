import { ReactElement } from 'react';
import ShopInfoCard from '../ShopInfo';

type RendererFn = (data: unknown) => ReactElement | null;
const toolsMap: Record<string, RendererFn> = {
  SHOP_INFO: ShopInfoCard,
};

const systemInfoRenderers = ({ action, data, ...rest }) => {
  if (!action) return null;

  const Component = toolsMap?.[action];
  if (!Component) {
    return (
      <pre className="p-2 bg-gray-100 rounded text-xs overflow-auto">
        {JSON.stringify({ action, data }, null, 2)}
      </pre>
    );
  }

  return <Component {...data} {...rest} />;
};
export default systemInfoRenderers;
