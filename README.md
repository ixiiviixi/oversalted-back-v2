# Oversalted

***

## Project insight

***

    > Oversalted is a website troubleshoot forum focused on creating a a world-based community enviroment to cater towards recipe developement, muilti-ended corrections, and experimentation in hypothetical food-cooking.

## MVP GOALS

***

    - User to make an account
    - Admin acct to god-like stuff like posting tag
        +just keep it to only posting tags
    - User submit Question
    - Review/edit question
    - Generalized tag list

## CURRENT Stretch Goals

***

    - Voting system that lets each user vote 1-3 times per forum
    - Feed that sorts by most recent or top three most voted

## Todo

***
    -finish editing routes to convert to async/await.
    -Edit Models as needed
    -other models(?)
    -sort routes/files by the data they contain. Example would be to move "router.route('/:userId/forums')
    .get(usersController.getUserForum)
    .post(usersController.newUserForum)" from the users route and place it into the forums route.

### Notes

***

    > The tag system: keywords are based on the search system. The goal is to have forums that have tags and are sorted by such. Users cannot add new tags however they can request one to be added.

    thoughts:

***

    > Public
        - feed(pending)
        - questions
        - catagorized
        - users [to be friends with each other]
    Incubators (open groups focused on their own topics)

    > vote system to decide to which is the most reccomended answer and have a top three displayed to show neutral judgement on appriopiate answers.tracks users vote per forum. Well fuck.
