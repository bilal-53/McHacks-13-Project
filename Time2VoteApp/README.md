

# What it does
Our online web application allows the people's vote to matter once again. It is a platform used for voting on different subjects where the choices are carefully analyzed by experts before being sent to the voters. When an organizer creates a poll, the options are sent to specific experts who are not only experts in the field of that poll's subject but are also of a diverse group to minimize biases. Then, the experts will have the opportunity to commend the organizer's options, stating each choice's pros and cons. After the analysis, the poll will be sent to a representative pool of people that will rank the options using the comment of the experts. This will allow the average voter to understand the different stakes at play better and make a more intelligent decision. The organizer can then check the votes and see the winning side.

# How we built it
In the front end, we mostly used React-Bootstrap for the UI. We created multiple pages for the organizers, experts, and voters. In the back end, we used firebase to store the vote data and the experts' advice. It is also connected to a web scrapper that searches for the most relevant experts and voters. That web scrapper uses the Twilio API to text people to make commenting/voting more user-friendly and intuitive.
