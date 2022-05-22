import { FC } from 'React'
import { useCallback } from 'react';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import cn from 'classnames';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import {
  deleteConstructorItem,
  moveConstructorItem
} from '../../services/actions/builder';
import { DND_TYPES, TDragIngredient, TСonstructorIngredient } from '../../types'


type TConstructorProps = Pick<TСonstructorIngredient, 'id' | 'price' | 'image'> & {
  text: string;
  type?: 'top' | 'bottom' | undefined;
  className: string;
  isLocked?: boolean;
};

const BurgerConstructorElement: FC<TConstructorProps> = (props) => {
  const { id, price, text, image, type, className, isLocked } = props;
  const dispatch = useDispatch();
  const deleteElement = useCallback(
    () => dispatch(deleteConstructorItem(id)),
    [dispatch, id]
  );
  const moveElement = useCallback(
    (id, toId) => dispatch(moveConstructorItem(id, toId)),
    [dispatch]
  );

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DND_TYPES.CONSTRUCTOR_ITEM,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const [, drop] = useDrop(
    () => ({
      accept: DND_TYPES.CONSTRUCTOR_ITEM,
      hover(item: TDragIngredient) {
        if (item.id !== id && !isLocked) {
          moveElement(item.id, id);
        }
      }
    }),
    []
  );

  const rootStyles = cn({
    [className]: true,
    [styles.ingredient]: true,
    [styles['constructor-element--dragging']]: isDragging
  });

  return (
    <div className={rootStyles} ref={(node) => drop(preview(node))}>
      {!isLocked ? (
        <button className={styles['drag-button']} ref={drag}>
          <DragIcon type="secondary" />
        </button>
      ) : (
        <span className={styles['drag-button']}></span>
      )}
      <div className="pr-4"></div>
      <div className={styles['constructor-element']}>
        <ConstructorElement
          type={type}
          price={price}
          text={text}
          thumbnail={image}
          isLocked={isLocked}
          handleClose={deleteElement}
        />
      </div>
    </div>
  );
};

export default BurgerConstructorElement;
