import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import checkMarkIcon from '../../images/order-check-mark.svg'

const OrderDetails = ({id}) => {
  return (
    <div className={styles.order}>
      <p className="text text_type_digits-large mb-8">{id}</p>
      <p className="text text_type_main-default mb-15">идентификатор заказа</p>
      <p className="mb-15">
        <img src={checkMarkIcon} alt="Заказ сделан"/>
      </p>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
} 

OrderDetails.propTypes = {
  id: PropTypes.number,
};

export default OrderDetails;
