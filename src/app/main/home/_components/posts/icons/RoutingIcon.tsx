import { Bad, Comment, Like, Retweet } from '@prisma/client';
import { CommentIcon } from './CommentIcon';
import { LikeIcon } from './LikeIcon';
import { RetweetIcon } from './RetweetIcon';
import { BadIcon } from './BadIcon';
import { useUserId } from '@/hooks/useUserId';

const ICONS = {
  LikeIcon: LikeIcon,
  BadIcon: BadIcon,
  RetweetIcon: RetweetIcon,
  CommentIcon: CommentIcon
};

type RoutingIconProps = {
  dataArray: Like[] | Bad[] | Retweet[] | Comment[];
  name: 'LikeIcon' | 'BadIcon' | 'RetweetIcon' | 'CommentIcon';
};

export const RoutingIcon: React.FC<RoutingIconProps> = ({ dataArray, name }) => {
  const loginUserId = useUserId();
  const myMark = dataArray.some((record) => record.userId === loginUserId);

  const IconComponent = ICONS[name];

  return (
    <div className='flex items-center'>
      <IconComponent myMark={myMark} />
      {dataArray.length > 0 && <div className='text-customeGray'>{dataArray.length}</div>}
    </div>
  );
};
