import { List } from '@/lib/ui/MTFix';
import SidebarLink from './SidebarLink';
import MultiLevelLink from './MultiLevelLink';
import { uniqueId } from 'lodash';

type Props = {
  links: MenuLinkType[]
}

const SidebarLinks = ({ links }: Props) => {

  return (
    <List
      className='text-inherit'
    >
      {
        links.map(link => {
          if (!!link.Links) {
            return (
              <MultiLevelLink
                link={link}
                key={uniqueId()}
              />
            )
          } else {
            return (
              <SidebarLink
                link={link}
                key={uniqueId()}
              />
            )
          }
        })
      }
    </List>
  )
}

export default SidebarLinks