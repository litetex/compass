const React = require('react');
const ValidationActions = require('../actions');
const OptionSelector = require('./common/option-selector');
const Rule = require('./rule');
const Editable = require('./common/editable');
const _ = require('lodash');

const ReactBootstrap = require('react-bootstrap');
const Grid = ReactBootstrap.Grid;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Button = ReactBootstrap.Button;
const Table = ReactBootstrap.Table;

// const debug = require('debug')('validation:rule-builder');

class RuleBuilder extends React.Component {


  /**
   * Add button clicked to create a new rule.
   */
  onAddClick() {
    ValidationActions.addValidationRule();
  }

  /**
   * New value from the validation action dropdown chosen.
   *
   * @param {String} action    the chosen action, one of `warn`, `error`.
   */
  onActionSelect(action) {
    ValidationActions.setValidationAction(action, true);
  }

  /**
   * New value from the validation level dropdown chosen.
   *
   * @param {String} level    the chosen level, one of `off`, `moderate`, `strict`
   */
  onLevelSelect(level) {
    ValidationActions.setValidationLevel(level, true);
  }

  /**
   * The "Cancel" button from the `Editable` component has been clicked.
   * Revert all changes to the server state.
   */
  onCancel() {
    ValidationActions.cancelChanges();
  }

  /**
   * The "Update" button from the `Editable component has been clicked.
   * Send the new validator doc to the server.
   */
  onUpdate() {
    ValidationActions.saveChanges();
  }

  /**
   * Render status row component.
   *
   * @returns {React.Component} The component.
   */
  render() {
    const rules = _.map(this.props.validationRules, (rule) => {
      return <Rule key={rule.id} {...rule} />;
    });

    return (
      <Editable
        editState={this.props.editState}
        childName="Validation"
        onCancel={this.onCancel.bind(this)}
        onUpdate={this.onUpdate.bind(this)}
      >
        <Grid fluid className="rule-builder">
          <Row className="header">
            <Col lg={6} md={6} sm={6} xs={6}>
              <Button
                bsStyle="success"
                bsSize="xsmall"
                onClick={this.onAddClick.bind(this)}>+ Add Rule
              </Button>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <div className="pull-right">
                <OptionSelector
                  id="validation-action-selector"
                  bsSize="xs"
                  options={{warn: 'Warning', error: 'Error'}}
                  value={this.props.validationAction}
                  label="validation action:"
                  onSelect={this.onActionSelect.bind(this)}
                />
                <OptionSelector
                  id="validation-level-selector"
                  bsSize="xs"
                  options={{off: 'Off', moderate: 'Moderate', strict: 'Strict'}}
                  value={this.props.validationLevel}
                  label="validation level:"
                  onSelect={this.onLevelSelect.bind(this)}
                />
              </div>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Table className="rule-builder-table">
                <thead>
                  <tr>
                    <th className="name-column">Field Name</th>
                    <th className="rule-column">Rule</th>
                    <th className="null-column">Nullable</th>
                    <th className="ctrl-column"></th>
                  </tr>
                </thead>
                <tbody>
                  {rules}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </Editable>
    );
  }
}

RuleBuilder.propTypes = {
  editState: React.PropTypes.oneOf(['unmodified', 'modified', 'updating', 'error', 'success']).isRequired,
  validationAction: React.PropTypes.oneOf(['warn', 'error']).isRequired,
  validationLevel: React.PropTypes.oneOf(['off', 'moderate', 'strict']).isRequired,
  validationRules: React.PropTypes.array.isRequired
};

RuleBuilder.displayName = 'RuleBuilder';

module.exports = RuleBuilder;