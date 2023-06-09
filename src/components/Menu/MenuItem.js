import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import styles from './Menu.module.scss'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function MenuItem({ data, onClick }) {
    const classes = cx('more-item',{
        separate: data.separate
    })
    return (
        <Button className={classes} to={data.to} onClick={onClick}>{data.icon} {data.title}</Button>
    )
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

export default MenuItem