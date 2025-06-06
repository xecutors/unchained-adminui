import classNames from 'classnames';
import AccordionItem from './AccordionItem';

const Accordion = ({
  data,
  containerCSS = '',
  headerCSS = '',
  bodyCSS = '',
  itemContainerCSS = '',
  ...rest
}) => {
  return (
    <div className={classNames('my-3', containerCSS)} {...rest}>
      {data.map(({ header, body }, key) => (
        <AccordionItem
          itemindex={key}
          header={header}
          body={body}
          // eslint-disable-next-line react/no-array-index-key
          key={key}
          headerCSS={headerCSS}
          bodyCSS={bodyCSS}
          itemContainerCSS={itemContainerCSS}
        />
      ))}
    </div>
  );
};

export default Accordion;
