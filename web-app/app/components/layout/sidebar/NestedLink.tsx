import { usePathname } from 'next/navigation';
import { ListItem, ListItemPrefix } from '@/lib/ui/MTFix';
import Link from 'next/link';

type Props = {
  link: NestedLinkType,
}


const NestedLink = ({ link }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === link.path;

  return (
    <Link
      href={link.path}
      className='text-inherit'
    >
      <ListItem
        selected={isActive}
        className={(isActive
          ? "bg-primary-light bg-opacity-30 "
          : "")
          + " hover:bg-primary-light hover:bg-opacity-30 focus:bg-primary-light focus:bg-opacity-30 active:bg-primary-light active:bg-opacity-30 text-inherit"
        }
      >
        <ListItemPrefix>
          {link.icon}
        </ListItemPrefix>
        {link.label}
      </ListItem>
    </Link>
  )
};

export default NestedLink