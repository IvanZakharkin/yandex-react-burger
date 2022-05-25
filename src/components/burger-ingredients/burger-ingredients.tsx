import { useState, useRef, useMemo, useEffect, RefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import BurgerIngredientsByType from '../burger-ingredients-by-type/burger-ingredients-by-type';
import styles from './burger-ingredients.module.css';
import { getIngredientsList } from '../../services/actions/builder';
import RingLoader from 'react-spinners/RingLoader';
import { TIngredient, TYPES_INGREDIENTS } from '../../types';

const TAB_LIST = {
  [TYPES_INGREDIENTS.bun]: 'Булки',
  [TYPES_INGREDIENTS.sauce]: 'Соусы',
  [TYPES_INGREDIENTS.main]: 'Начинки'
};

type TBlockTypeRefs = {
  [TYPES_INGREDIENTS.bun]: RefObject<HTMLDivElement>;
  [TYPES_INGREDIENTS.sauce]: RefObject<HTMLDivElement>;
  [TYPES_INGREDIENTS.main]: RefObject<HTMLDivElement>;
};

const BurgerIngredients = () => {
  const ingredients: ReadonlyArray<TIngredient> = useSelector((state: any) => state.builder.ingredientsList);// tslint:disable-line
  const ingredientsListRequest = useSelector(
    (state: any) => state.builder.ingredientsListRequest
  );
  const ingredientsListError = useSelector(
    (state: any) => state.builder.ingredientsListError
  );
  const dispatch = useDispatch();

  const ingredientsByTypes = useMemo(
    () => ({
      sauce: ingredients.filter((ingredient) => ingredient.type === TYPES_INGREDIENTS.sauce),
      main: ingredients.filter((ingredient) => ingredient.type === TYPES_INGREDIENTS.main),
      bun: ingredients.filter((ingredient) => ingredient.type === TYPES_INGREDIENTS.bun)
    }),
    [ingredients]
  );

  const types = Object.values(TYPES_INGREDIENTS);
  const listRef = useRef<HTMLDivElement>(null);
  const blockTypeRefs: TBlockTypeRefs = {
    bun: useRef<HTMLDivElement>(null),
    main: useRef<HTMLDivElement>(null),
    sauce: useRef<HTMLDivElement>(null)
  };

  const [activeTab, setActiveTab] = useState(types[0]);

  const handlerScroll = (): void => {
    if (!listRef.current) {
      return;
    }
    const scrollTop = listRef.current.scrollTop - 20;
    const typeBloksBottomCoordinates = types.map((type): number => {
      const node = blockTypeRefs[type].current;
      if (!node) {
        return 0;
      }
      return node.offsetTop + node.offsetHeight;
    });

    const index = typeBloksBottomCoordinates.findIndex((b: number): boolean => scrollTop <= b);

    for (let i = 0; i < types.length; i += 1) {
      const type = types[i];
      if (type !== activeTab && i === index) {
        setActiveTab(type);
        break;
      }
    }
  };

  const handlerTabClick = (tab: string) => {
    if (!listRef.current) {
      return;
    }
    const typeNode = blockTypeRefs[tab as TYPES_INGREDIENTS].current;
    if (typeNode) {
      listRef.current.scrollTop = typeNode.offsetTop;
    }
  };

  useEffect(() => {
    dispatch(getIngredientsList());
  }, [dispatch]);

  return (
    <section className={styles['ingredients-section']}>
      <h2 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h2>
      {ingredientsListError ? (
        ingredientsListError
      ) : ingredientsListRequest ? (
        <div className={styles.loader}>
          <RingLoader size={150} color="#4c4cff" loading={true} />
        </div>
      ) : (
        <>
          <div className={cn('mb-10', styles.tabs)}>
            {types.map((type) => (
              <Tab
                value={type}
                key={type}
                active={type === activeTab}
                onClick={handlerTabClick}
              >
                {TAB_LIST[type]}
              </Tab>
            ))}
          </div>
          <div
            className={styles['ingredients-list']}
            ref={listRef}
            onScroll={handlerScroll}
          >
            {types.map((type) => (
              <BurgerIngredientsByType
                ref={blockTypeRefs[type]}
                key={type}
                type={type}
                ingredients={ingredientsByTypes[type]}
                title={TAB_LIST[type]}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default BurgerIngredients;
