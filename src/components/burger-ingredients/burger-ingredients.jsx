import { useState, useRef, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import BurgerIngredientsByType from '../burger-ingredients-by-type/burger-ingredients-by-type';
import styles from './burger-ingredients.module.css';
import { getIngredientsList } from '../../services/actions/builder';
import RingLoader from 'react-spinners/RingLoader';

const TAB_LIST = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
};

const BurgerIngredients = () => {
  const ingredients = useSelector((state) => state.builder.ingredientsList);
  const ingredientsListRequest = useSelector(
    (state) => state.builder.ingredientsListRequest
  );
  const ingredientsListError = useSelector(
    (state) => state.builder.ingredientsListError
  );
  const dispatch = useDispatch();

  const ingredientsByTypes = useMemo(
    () => ({
      sauce: ingredients.filter((ingredient) => ingredient.type === 'sauce'),
      main: ingredients.filter((ingredient) => ingredient.type === 'main'),
      bun: ingredients.filter((ingredient) => ingredient.type === 'bun')
    }),
    [ingredients]
  );

  const types = Object.keys(TAB_LIST);
  const listRef = useRef(null);
  const blockTypeRefs = {
    bun: useRef(null),
    main: useRef(null),
    sauce: useRef(null)
  };

  const [activeTab, setActiveTab] = useState(types[0]);

  const handlerScroll = () => {
    const scrollTop = listRef.current.scrollTop - 20;
    const typeBloksBottomCoordinates = types.map((type) => {
      const node = blockTypeRefs[type].current;
      return node.offsetTop + node.offsetHeight;
    });

    const index = typeBloksBottomCoordinates.findIndex((b) => scrollTop <= b);

    for (let i = 0; i < types.length; i += 1) {
      const type = types[i];
      if (type !== activeTab && i === index) {
        setActiveTab(type);
        break;
      }
    }
  };

  const handlerTabClick = (tab) => {
    const typeNode = blockTypeRefs[tab].current;
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
