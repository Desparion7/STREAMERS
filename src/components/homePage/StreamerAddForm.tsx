/* eslint-disable jsx-a11y/control-has-associated-label */
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { FormValues } from '../../interface/form-interface';
import styles from './StreamerAddForm.module.scss';
import { useAddStreamerMutation } from '../../app/slice/streamersApiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';

const StreamerAddForm = () => {
  const [addNewStreamer, { isSuccess, isLoading, isError, error }] =
    useAddStreamerMutation();

  // Function to validate form
  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.name) {
      errors.name = 'Required field';
    }
    if (!values.platform) {
      errors.platform = 'Required field';
    }
    if (!values.description) {
      errors.description = 'Required field';
    }
    if (values.description.trim().length > 350) {
      errors.description = 'Description is too long, maximum 150 characters';
    }

    return errors;
  };
  // Function to add new streamer
  const sendMessageHandler = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    await addNewStreamer({
      name: values.name,
      platform: values.platform,
      description: values.description,
    });
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div className={`${styles.streamerAddForm} containter gradient__bg`}>
      {isLoading && <LoadingSpinner />}
      <Formik
        initialValues={{
          name: '',
          platform: 'Twitch',
          description: '',
        }}
        validate={validateForm}
        onSubmit={sendMessageHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <h2 className="gradient__text">Add New Streamer</h2>
            <label htmlFor="name">Streamer Name:</label>
            <Field
              type="name"
              id="name"
              name="name"
              className={errors.name && touched.name && styles.errorInput}
              placeholder={errors.name && touched.name ? errors.name : ''}
            />
            <label htmlFor="platform">Streaming Platform:</label>
            <Field as="select" id="platform" name="platform">
              <option defaultValue="Twitch">Twitch</option>
              <option value="YouTube">YouTube</option>
              <option value="TikTok">TikTok</option>
              <option value="Kick">Kick</option>
              <option value="Rumble">Rumble</option>
            </Field>
            <label htmlFor="description">Description:</label>
            <Field
              as="textarea"
              id="description"
              name="description"
              cols={50}
              rows={5}
              maxLength={350}
              className={
                errors.description && touched.description && styles.errorInput
              }
              placeholder={
                errors.description && touched.description
                  ? errors.description
                  : ''
              }
            />
            {errors.description ===
              'Description is too long, maximum 150 characters' && (
              <ErrorMessage
                name="description"
                component="div"
                className={styles.errorText}
              />
            )}
            <button type="submit" className="orangeButton">
              Add Streamer
            </button>
            {isError && error && 'data' in error && (
              <div className="errorText">{error.data.message}</div>
            )}
            {isSuccess && (
              <div className="successText">
                New streamer added successfully!
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StreamerAddForm;
